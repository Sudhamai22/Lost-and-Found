package com.srmap.lostandfound.service;

import com.srmap.lostandfound.dto.ItemRequest;
import com.srmap.lostandfound.dto.ItemResponse;
import com.srmap.lostandfound.model.Item;
import com.srmap.lostandfound.model.User;
import com.srmap.lostandfound.repository.ItemRepository;
import com.srmap.lostandfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    public ItemResponse createItem(ItemRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Item item = new Item();
        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setType(Item.ItemType.valueOf(request.getType().toUpperCase()));
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());
        item.setDateOccurred(request.getDateOccurred());
        item.setContactInfo(request.getContactInfo());
        item.setReportedBy(user);

        return ItemResponse.fromItem(itemRepository.save(item));
    }

    public List<ItemResponse> searchItems(String type, String category, String keyword) {
        Item.ItemType itemType = null;
        if (type != null && !type.isEmpty() && !type.equalsIgnoreCase("ALL")) {
            itemType = Item.ItemType.valueOf(type.toUpperCase());
        }
        String cat = (category != null && category.isEmpty()) ? null : category;
        String kw = (keyword != null && keyword.isEmpty()) ? null : keyword;

        return itemRepository.searchItems(itemType, cat, kw)
                .stream()
                .map(ItemResponse::fromItem)
                .collect(Collectors.toList());
    }

    public List<ItemResponse> getAllItems() {
        return itemRepository.findAllByOrderByDateReportedDesc()
                .stream()
                .map(ItemResponse::fromItem)
                .collect(Collectors.toList());
    }

    public ItemResponse getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        return ItemResponse.fromItem(item);
    }

    public List<ItemResponse> getMyItems(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return itemRepository.findByReportedBy(user)
                .stream()
                .map(ItemResponse::fromItem)
                .collect(Collectors.toList());
    }

    public ItemResponse updateStatus(Long id, String status, String userEmail) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getReportedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("Not authorized to update this item");
        }

        item.setStatus(Item.ItemStatus.valueOf(status.toUpperCase()));
        return ItemResponse.fromItem(itemRepository.save(item));
    }

    public void deleteItem(Long id, String userEmail) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getReportedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("Not authorized to delete this item");
        }

        itemRepository.delete(item);
    }

    public ItemResponse updateItem(Long id, ItemRequest request, String userEmail) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getReportedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("Not authorized to update this item");
        }

        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setType(Item.ItemType.valueOf(request.getType().toUpperCase()));
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());
        item.setDateOccurred(request.getDateOccurred());
        item.setContactInfo(request.getContactInfo());

        return ItemResponse.fromItem(itemRepository.save(item));
    }
}
