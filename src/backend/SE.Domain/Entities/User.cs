﻿
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SE.Domain.Entities
{
    [Table("User")]
    public class User : BaseEntity
    {
        [MaxLength(50)]
        [Required]
        public string FirstName { get; set; }

        [MaxLength(50)]
        [Required]
        public string LastName { get; set; }

        [MaxLength(256)]
        [Required]
        public string EmailAddress { get; set; }

        [MaxLength(256)]
        [Required]
        public string UserName { get; set; }
        public string ProfileImageUrl { get; set; }

        [MaxLength(256)]
        [Required]
        public string LoginName { get; set; }

        [MaxLength(20)]
        public string CertificateNumber { get; set; }

        [MaxLength(1000)]
        public string OTPW { get; set; }

        public DateTime? LastLoginDateTime { get; set; }

        public virtual List<UserBuildingRole> UserBuildingRoles { get;  }
        public virtual List<WorkAreaContext> WorkAreaContexts { get; }

        public virtual List<RefreshToken> RefreshTokens { get; set; }
    }
}