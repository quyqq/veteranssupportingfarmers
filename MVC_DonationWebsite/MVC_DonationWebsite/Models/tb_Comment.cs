namespace MVC_DonationWebsite.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tb_Comment
    {
        [Key]
        public long CommentID { get; set; }

        [Required]
        [StringLength(50)]
        public string Town { get; set; }

        public int PostCode { get; set; }

        [Column(TypeName = "date")]
        public DateTime FromDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime ToDate { get; set; }

        [Required]
        [StringLength(500)]
        public string Comment { get; set; }

        public int NoOfPeople { get; set; }
    }
}
