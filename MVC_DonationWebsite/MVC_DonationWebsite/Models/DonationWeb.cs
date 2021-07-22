namespace MVC_DonationWebsite.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DonationWeb : DbContext
    {
        public DonationWeb()
            : base("name=DonationWeb")
        {
        }

        public DonationWeb(string stringConnection)
                    : base(nameOrConnectionString: stringConnection)
        {
        }
        public virtual DbSet<tb_Comment> tb_Comment { get; set; }
        public virtual DbSet<tb_donationRecord> tb_donationRecord { get; set; }
        public virtual DbSet<tb_picture> tb_picture { get; set; }
        public virtual DbSet<tb_setting> tb_setting { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
