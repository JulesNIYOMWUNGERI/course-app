package org.academy.dtos;

public record PaginationDto<T>(Long totalCount, Long totalPages, int page, int size, T data) {}
