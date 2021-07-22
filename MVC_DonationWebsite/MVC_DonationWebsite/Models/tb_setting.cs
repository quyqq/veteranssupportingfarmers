namespace MVC_DonationWebsite.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tb_setting
    {
        [Key]
        public int settingID { get; set; }

        public string textData { get; set; }

        [Required]
        [StringLength(50)]
        public string type { get; set; }

        [StringLength(50)]
        public string colour { get; set; }

        [StringLength(10)]
        public string size { get; set; }
    }
}
