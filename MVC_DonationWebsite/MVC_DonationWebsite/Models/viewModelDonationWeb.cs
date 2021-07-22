using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC_DonationWebsite.Models
{
    public class viewModelDonationWeb
    {
        public viewModelDonationWeb()
        {
            this.tb_Comment = null;
            this.tb_donationRecord = null;
            this.tb_setting = null;
            this.tb_picture = null;
        }
        public viewModelDonationWeb(IEnumerable<tb_Comment> tb_Comment, 
            IEnumerable<tb_donationRecord> tb_donationRecord,
            IEnumerable<tb_setting> tb_setting, IEnumerable<tb_picture> tb_picture)
        {
            this.tb_Comment = tb_Comment;
            this.tb_donationRecord = tb_donationRecord;
            this.tb_setting = tb_setting;
            this.tb_picture = tb_picture;
        }
        public IEnumerable<tb_Comment> tb_Comment { get; set; }
        public IEnumerable<tb_donationRecord> tb_donationRecord { get; set; }
        public IEnumerable<tb_picture> tb_picture { get; set; }
        public IEnumerable<tb_setting> tb_setting { get; set; }
    }
}