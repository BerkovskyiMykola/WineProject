using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WineProject.Models;

namespace WineProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarrelsController : ControllerBase
    {
        private readonly DataContext _context;

        public BarrelsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User,VIP")]
        [HttpGet("allActive")]
        public async Task<IActionResult> GetActiveBarrels()
        {
            var user = await _context.Users
                .Include(x => x.Barrels.Where(x => x.DateStart.AddMonths(x.AmountMonth).Date > DateTime.Today))
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Barrels.Select(x => new { x.BarrelId, x.Sort, x.DateStart, x.AmountMonth}));
        }

        [Authorize(Roles = "VIP")]
        [HttpGet("allInActive")]
        public async Task<IActionResult> GetInactiveBarrels()
        {
            var user = await _context.Users
                .Include(x => x.Barrels.Where(x => x.DateStart.AddMonths(x.AmountMonth).Date < DateTime.Today))
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.Barrels.Select(x => new { x.BarrelId, x.Sort, x.DateStart, x.AmountMonth }));
        }

        [Authorize(Roles = "User,VIP")]
        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutBarrel(int id, Barrel barrel)
        {
            if (id != barrel.BarrelId)
            {
                return BadRequest();
            }

            if(!await _context.Barrels.AnyAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.BarrelId == id))
            {
                return BadRequest();
            }

            _context.Entry(barrel).State = EntityState.Modified;
            _context.Entry(barrel).Property(x => x.UserId).IsModified = false;
            _context.Entry(barrel).Property(x => x.DateStart).IsModified = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BarrelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize(Roles = "User,VIP")]
        [HttpPost("create")]
        public async Task<IActionResult> PostBarrel(Barrel barrel)
        {
            barrel.User = await _context.Users
                .SingleOrDefaultAsync(x => x.Email == HttpContext.User.Identity.Name);

            barrel.DateStart = DateTime.Today;
            _context.Barrels.Add(barrel);
            await _context.SaveChangesAsync();

            return Ok(new { barrel.BarrelId, barrel.Sort, barrel.DateStart, barrel.AmountMonth });
        }

        [Authorize(Roles = "User,VIP")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBarrel(int id)
        {
            var barrel = await _context.Barrels.FindAsync(id);
            if (barrel == null)
            {
                return NotFound();
            }

            if (!await _context.Barrels.AnyAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.BarrelId == id))
            {
                return BadRequest();
            }

            _context.Barrels.Remove(barrel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BarrelExists(int id)
        {
            return _context.Barrels.Any(e => e.BarrelId == id);
        }
    }
}
