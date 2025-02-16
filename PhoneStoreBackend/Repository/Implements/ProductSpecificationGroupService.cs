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

        public async Task<List<ProductSpecificationGroupDTO>> AddListSpecOfACategoryAsync(List<ProductSpecificationGroup> listSpec)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var result = new List<ProductSpecificationGroupDTO>();

                for (int i = 0; i < listSpec.Count; i++)
                {
                    var spec = listSpec[i];

                    // Thiết lập DisplayOrder dựa trên index
                    spec.DisplayOrder = i + 1;

                    var entity = _dbContext.ProductSpecificationGroups.Add(spec);
                    result.Add(_mapper.Map<ProductSpecificationGroupDTO>(entity.Entity));
                }

                await _dbContext.SaveChangesAsync(); 


                await transaction.CommitAsync();
                return result;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); 
                throw new Exception("Lỗi khi thêm danh sách nhóm thông số sản phẩm", ex);
            }
        }
    }
}
