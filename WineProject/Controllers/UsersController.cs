using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WineProject.Models;
using WineProject.Models.Request;
using WineProject.Services.Authorization.Models;
using WineProject.Sevices.Authorization;

namespace WineProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IJwtService _jwtService;

        public UsersController(DataContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest model, string referalToken)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }

            var newUser = new User()
            {
                Lastname = model.Lastname,
                Firstname = model.Firstname,
                Email = model.Email,
                Password = GetPasswordHash(model.Password),
                RoleId = 2
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            var token = _jwtService.GetToken(new JwtUser { Login = newUser.Email, Role = "User" });

            return Ok(new { token, newUser.UserId, Role = "User" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            var user = await _context.Users.Include(x => x.Role).SingleOrDefaultAsync(x => x.Email == model.Email);

            if (user == null || user.Password != GetPasswordHash(model.Password))
            {
                return BadRequest("Email or password is incorrect");
            }

            var token = _jwtService.GetToken(new JwtUser { Login = user.Email, Role = user.Role.Name });
            var response = new
            {
                Token = token,
                Role = user.Role.Name,
                user.UserId
            };

            return Ok(response);
        }

        [HttpGet("one")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                user.Firstname,
                user.Lastname,
                user.Email
            });
        }

        [HttpPut("edit/profile/{id}")]
        [Authorize]
        public async Task<IActionResult> PutUserProfile(int id, ProfileRequest profile)
        {
            if (id != profile.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            user.Lastname = profile.Lastname;
            user.Firstname = profile.Firstname;

            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/Users
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _context.Users
                .Where(x => x.Email != HttpContext.User.Identity.Name)
                .Select(x => new { x.UserId, x.Firstname, x.Lastname, x.Email, x.Role })
                .ToListAsync());
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PostUser(User model)
        {
            if (await _context.Users.AnyAsync(x => x.Email == model.Email))
            {
                return BadRequest("User with such Email exists");
            }
            model.Password = GetPasswordHash(model.Password);

            await _context.Users.AddAsync(model);
            await _context.SaveChangesAsync();

            return Ok(new { model.UserId, model.Firstname, model.Lastname, model.Email, model.Role });
        }

        [HttpPut("edit/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutUser(int id, EditUserRequest model)
        {
            if (id != model.UserId)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(model.UserId);

            if (user == null)
            {
                return NotFound();
            }

            user.Lastname = model.Lastname;
            user.Firstname = model.Firstname;
            user.Role = await _context.Roles.SingleOrDefaultAsync(x => x.Name == model.Role);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string GetPasswordHash(string password)
        {
            byte[] hash;
            using (var sha1 = new SHA1CryptoServiceProvider())
                hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);

        }

        [HttpGet("backup")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Backup()
        {
            string dbname = _context.Database.GetDbConnection().Database;
            if (System.IO.File.Exists($"C:\\Backup\\{dbname}.bak"))
            {
                System.IO.File.Delete($"C:\\Backup\\{dbname}.bak");
            }
            string sqlCommand = $"BACKUP DATABASE {dbname} TO DISK = 'C:\\Backup\\{dbname}.bak'";
            await _context.Database.ExecuteSqlRawAsync(sqlCommand);
            return Ok();
        }

        [HttpGet("restore")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Restore()
        {
            string dbname = _context.Database.GetDbConnection().Database;
            string sqlCommand1 = $"USE master RESTORE DATABASE {dbname} FROM DISK = 'C:\\Backup\\{dbname}.bak'";
            await _context.Database.ExecuteSqlRawAsync(sqlCommand1);
            return Ok();
        }
    }
}
