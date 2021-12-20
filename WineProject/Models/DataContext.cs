using Microsoft.EntityFrameworkCore;

namespace WineProject.Models
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Barrel> Barrels { get; set; }
        public DbSet<Measurement> Measurements { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(new Role()
            {
                RoleId = 1,
                Name = "Admin"
            },
            new Role()
            {
                RoleId = 2,
                Name = "User"
            },
            new Role()
            {
                RoleId = 3,
                Name = "VIP"
            });
        }
    }
}
