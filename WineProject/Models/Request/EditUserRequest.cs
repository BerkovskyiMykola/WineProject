using System.ComponentModel.DataAnnotations;

namespace WineProject.Models.Request
{
    public class EditUserRequest
    {
        public int UserId { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Lastname { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Firstname { set; get; }
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Surname { set; get; }
        [Required]
        public string Role { set; get; }
        [Range(0.0, double.MaxValue)]
        public double Balance { set; get; }
    }
}
