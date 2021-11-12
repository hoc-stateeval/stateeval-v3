namespace SE.Domain.Entities
{
    public abstract class BaseEntity
    {
        public long Id { get; set; }
        protected BaseEntity() { }
   
        protected BaseEntity(long id) : this()
        {
            Id = id;
        }
    }
}