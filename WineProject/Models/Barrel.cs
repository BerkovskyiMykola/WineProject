using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WineProject.Models
{
    public class Barrel
    {
        public int BarrelId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Sort { get; set; }
        public DateTime DateStart { get; set; }
        [Range(1, int.MaxValue)]
        public int AmountMonth { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public List<Measurement> Measurements { get; set; } = new List<Measurement>();
    }
}
