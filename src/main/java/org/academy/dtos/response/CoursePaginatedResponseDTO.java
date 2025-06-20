package org.academy.dtos.response;

import java.util.List;

public class CoursePaginatedResponseDTO<T> {
  private List<T> items;
  private long totalCount;

  public CoursePaginatedResponseDTO(List<T> items, long totalCount) {
    this.items = items;
    this.totalCount = totalCount;
  }

  public List<T> getItems() {
    return items;
  }

  public long getTotalCount() {
    return totalCount;
  }
}
