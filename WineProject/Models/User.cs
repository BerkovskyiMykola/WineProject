using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WineProject.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; }
        [Required]
        [EmailAddress]
        public string Email { set; get; }
        [Required]
        public string Password { set; get; }

        public int RoleId { get; set; }
        public Role Role { get; set; }

        public List<Barrel> Barrels { get; set; } = new List<Barrel>();
    }
}
