namespace MVC_DonationWebsite.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tb_donationRecord
    {
        [Key]
        public long donationID { get; set; }

        public double amount { get; set; }

        [Column(TypeName = "date")]
        public DateTime date { get; set; }

        [StringLength(50)]
        public string time { get; set; }
    }
}
