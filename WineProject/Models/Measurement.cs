using System;
using System.ComponentModel.DataAnnotations;

namespace WineProject.Models
{
    public class Measurement
    {
        public int MeasurementId { get; set; }
        [Range(5.0, 30.0)]
        public double Temperature { get; set;}
        [Range(0.05, 0.35)]
        public double SugarContent { get; set; }
        [Range(0.0, 1.0)]
        public double Transparency { get; set; }
        [Range(0.03, 0.3)]
        public double AlcoholContent { get; set; }
        [Range(0.05, 0.4)]
        public double Acidity { get; set; }
        [Range(0.0, 300.0)]
        public double Weight { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;

        public int BarrelId { get; set; }
        public Barrel Barrel { get; set; }
    }
}
