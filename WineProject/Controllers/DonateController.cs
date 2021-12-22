using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WineProject.Services.Pay;
using WineProject.Models;
using MlkPwgen;

namespace WineProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonateController : ControllerBase
    {
        private readonly PayService _payService;
        private readonly DataContext _context;
        public DonateController(PayService payService, DataContext context)
        {
            _payService = payService;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PayButtonModel>> GetDonate(int amount)
        {
            var orderId = PasswordGenerator.Generate(length: 10, allowed: Sets.Alphanumerics);
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == HttpContext.User.Identity.Name);
            user.RoleId = 3;
            var payButton = _payService.GetPayButton(new PayOptions()
            {
                Amount = amount.ToString(),
                Currency = "UAH",
                Description = "Get VIP",
                Version = "3",
                OrderId = orderId
            });
            await _context.SaveChangesAsync();
            return payButton;
        }
    }
}
