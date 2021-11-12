
namespace SE.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
        public string UserName { get; }
        public string Password { get; }
        public string ProfileImageUrl { get; }
        public string LoginName { get; }

        public virtual ICollection<UserBuildingRole> UserBuildingRoles { get; set; }
        public virtual ICollection<WorkAreaContext> WorkAreaContexts { get; set; }
    }
}