using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WineProject.Models;

namespace WineProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementsController : ControllerBase
    {
        private readonly DataContext _context;

        public MeasurementsController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "User,VIP")]
        [HttpGet("all/{id}")]
        public async Task<IActionResult> GetMeasurements(int id)
        {
            var barrel = await _context.Barrels
                .Include(x => x.Measurements)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.BarrelId == id);

            if (barrel == null)
            {
                return BadRequest();
            }

            return Ok(new { 
                barrel.Sort,
                barrel.DateStart,
                measurements = barrel.Measurements.OrderByDescending(x => x.DateTime).Select(x => new {
                    x.MeasurementId,
                    x.Temperature,
                    x.SugarContent,
                    x.Transparency,
                    x.AlcoholContent,
                    x.Acidity,
                    x.Weight,
                    x.DateTime
                })
            });
        }

        [Authorize(Roles = "User,VIP")]
        [HttpPost("create")]
        public async Task<IActionResult> PostMeasurement(Measurement measurement)
        {
            var barrel = await _context.Barrels
                .Include(x => x.Measurements)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.BarrelId == measurement.BarrelId);

            if (barrel == null)
            {
                return BadRequest();
            }

            _context.Measurements.Add(measurement);
            await _context.SaveChangesAsync();

            return Ok(new { 
                measurement.MeasurementId, 
                measurement.Temperature, 
                measurement.SugarContent, 
                measurement.Transparency, 
                measurement.AlcoholContent, 
                measurement.Acidity, 
                measurement.Weight, 
                measurement.DateTime
            });
        }

        [Authorize(Roles = "User,VIP")]
        [HttpPost("createRandom/{barrelId}")]
        public async Task<ActionResult<Measurement>> PostMeasurement(int barrelId)
        {
            var barrel = await _context.Barrels
                .Include(x => x.Measurements)
                .SingleOrDefaultAsync(x => x.User.Email == HttpContext.User.Identity.Name && x.BarrelId == barrelId);

            if (barrel == null)
            {
                return BadRequest();
            }

            Measurement measurement = new Measurement {
                Temperature = new Random().NextDouble(5.0, 30.0),
                SugarContent = new Random().NextDouble(0.05, 0.35),
                Transparency = new Random().NextDouble(0.0, 1.0),
                AlcoholContent = new Random().NextDouble(0.03, 0.3),
                Acidity = new Random().NextDouble(0.05, 0.4),
                Weight = new Random().NextDouble(0.0, 300.0),
                BarrelId = barrel.BarrelId,
            };

            _context.Measurements.Add(measurement);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                measurement.MeasurementId,
                measurement.Temperature,
                measurement.SugarContent,
                measurement.Transparency,
                measurement.AlcoholContent,
                measurement.Acidity,
                measurement.Weight,
                measurement.DateTime
            });
        }
    }

    public static class RandomExtensions
    {
        public static double NextDouble(
            this Random random,
            double minValue,
            double maxValue)
        {
            return random.NextDouble() * (maxValue - minValue) + minValue;
        }
    }
}
