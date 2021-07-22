namespace MVC_DonationWebsite.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tb_picture
    {
        [Key]
        public long pictureID { get; set; }

        [Column(TypeName = "image")]
        [Required]
        public byte[] imageData { get; set; }

        [Required]
        [StringLength(50)]
        public string code { get; set; }

        public int? sizeX { get; set; }

        public int? sizeY { get; set; }
    }
}
