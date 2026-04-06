package com.srmap.lostandfound.repository;

import com.srmap.lostandfound.model.Item;
import com.srmap.lostandfound.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByReportedBy(User user);

    List<Item> findByType(Item.ItemType type);

    List<Item> findByStatus(Item.ItemStatus status);

    @Query("SELECT i FROM Item i WHERE i.status = 'ACTIVE' AND " +
           "(:type IS NULL OR i.type = :type) AND " +
           "(:category IS NULL OR i.category = :category) AND " +
           "(:keyword IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(i.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(i.location) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
           "ORDER BY i.dateReported DESC")
    List<Item> searchItems(
        @Param("type") Item.ItemType type,
        @Param("category") String category,
        @Param("keyword") String keyword
    );

    List<Item> findAllByOrderByDateReportedDesc();
}
