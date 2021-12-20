using System;
using System.ComponentModel.DataAnnotations;

namespace WineProject.Models
{
    public class Measurement
    {
        public int MeasurementId { get; set; }
        [Range(0, int.MaxValue)]
        public int Temperature { get; set;}
        [Range(0.0, 1.0)]
        public double SugarContent { get; set; }
        [Range(0.0, 1.0)]
        public double Transparency { get; set; }
        [Range(0.0, 1.0)]
        public double AlcoholContent { get; set; }
        [Range(0.0, 1.0)]
        public double Acidity { get; set; }
        [Range(0.0, int.MaxValue)]
        public double Weight { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public int BarrelId { get; set; }
        public Barrel Barrel { get; set; }
    }
}
