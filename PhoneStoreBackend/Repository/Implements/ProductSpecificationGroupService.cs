using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;

namespace PhoneStoreBackend.Repository.Implements
{
    public class ProductSpecificationGroupService : IProductSpecificationGroupRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public ProductSpecificationGroupService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<ProductSpecificationGroupDTO>> GetAllProductSpecificationGroupsAsync()
        {
            var groups = await _dbContext.ProductSpecificationGroups.ToListAsync();
            return _mapper.Map<List<ProductSpecificationGroupDTO>>(groups);
        }

        public async Task<ProductSpecificationGroupDTO> GetProductSpecificationGroupByIdAsync(int id)
        {
            var group = await _dbContext.ProductSpecificationGroups.FindAsync(id);
            return group != null ? _mapper.Map<ProductSpecificationGroupDTO>(group) : null;
        }

        public async Task<ProductSpecificationGroupDTO> AddProductSpecificationGroupAsync(ProductSpecificationGroup specGroup)
        {
            _dbContext.ProductSpecificationGroups.Add(specGroup);
            await _dbContext.SaveChangesAsync();
            return _mapper.Map<ProductSpecificationGroupDTO>(specGroup);
        }
    }
}
