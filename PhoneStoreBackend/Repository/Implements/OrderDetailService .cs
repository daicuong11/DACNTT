﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PhoneStoreBackend.DbContexts;
using PhoneStoreBackend.DTOs;
using PhoneStoreBackend.Entities;
using PhoneStoreBackend.Repository;

namespace PhoneStoreBackend.Repository.Implements
{
    public class OrderDetailService : IOrderDetailRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public OrderDetailService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Lấy tất cả các chi tiết đơn hàng
        public async Task<ICollection<OrderDetailDTO>> GetAllOrderDetailsAsync()
        {
            var orderDetails = await _context.OrderDetails.ToListAsync();
            return orderDetails.Select(od => _mapper.Map<OrderDetailDTO>(od)).ToList();
        }

        // Lấy chi tiết đơn hàng theo OrderDetailId
        public async Task<OrderDetail> GetOrderDetailByIdAsync(int orderDetailId)
        {
            var orderDetail = await _context.OrderDetails
                .Include(od => od.ProductVariant)
                .FirstOrDefaultAsync(od => od.OrderDetailId == orderDetailId);
            if (orderDetail == null)
            {
                throw new KeyNotFoundException("OrderDetail not found.");
            }
            return orderDetail;
        }

        // Lấy các chi tiết đơn hàng theo OrderId
        public async Task<ICollection<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            return await _context.OrderDetails.Where(od => od.OrderId == orderId).ToListAsync();
        }

        // Thêm chi tiết đơn hàng
        public async Task<OrderDetailDTO> AddOrderDetailAsync(OrderDetail orderDetail)
        {
            var newOrderDetail = await _context.OrderDetails.AddAsync(orderDetail);
            await _context.SaveChangesAsync();
            return _mapper.Map<OrderDetailDTO>(newOrderDetail.Entity);
        }

        // Cập nhật chi tiết đơn hàng
        public async Task<bool> UpdateOrderDetailAsync(int orderDetailId, OrderDetail orderDetail)
        {
            var existingOrderDetail = await _context.OrderDetails.FindAsync(orderDetailId);
            if (existingOrderDetail == null)
            {
                throw new KeyNotFoundException("OrderDetail not found.");
            }

            existingOrderDetail.Quantity = orderDetail.Quantity;
            existingOrderDetail.UnitPrice = orderDetail.UnitPrice;

            _context.OrderDetails.Update(existingOrderDetail);
            await _context.SaveChangesAsync();

            return true;
        }

        // Xóa chi tiết đơn hàng
        public async Task<bool> DeleteOrderDetailAsync(int orderDetailId)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(orderDetailId) ?? throw new KeyNotFoundException("OrderDetail not found.");
            _context.OrderDetails.Remove(orderDetail);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<ICollection<OrderDetail>> AddMultipleOrderDetailsAsync(ICollection<OrderDetail> orderDetails)
        {
            if (orderDetails == null || !orderDetails.Any())
                throw new ArgumentException("Danh sách đơn hàng không được rỗng.");

            await _context.OrderDetails.AddRangeAsync(orderDetails);
            await _context.SaveChangesAsync();

            return orderDetails;
        }


    }
}
