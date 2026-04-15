package com.srmap.lostandfound.config;

import com.srmap.lostandfound.model.Item;
import com.srmap.lostandfound.model.User;
import com.srmap.lostandfound.repository.ItemRepository;
import com.srmap.lostandfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Seed demo users
        User u1 = new User("Arjun Sharma", "arjun.sharma@srmap.edu.in", passwordEncoder.encode("arjun"));
        User u2 = new User("Priya ", "priya@srmap.edu.in", passwordEncoder.encode("priya"));
        User u3 = new User("Sudhamai", "sudhamai@srmap.edu.in", passwordEncoder.encode("sudhamai"));
        User u4 = new User("Swathi", "swathi@srmap.edu.in", passwordEncoder.encode("swathi"));
        User u5 = new User("Nagur", "nagur@srmap.edu.in", passwordEncoder.encode("nagur"));
        User u6 = new User("Madhavi", "madhavi@srmap.edu.in", passwordEncoder.encode("madhavi"));

        userRepository.save(u1);
        userRepository.save(u2);
        userRepository.save(u3);
        userRepository.save(u4);
        userRepository.save(u5);
        userRepository.save(u6);

        // Seed demo items
        Item i1 = new Item();
        i1.setTitle("Blue HP Laptop Bag");
        i1.setDescription(
                "Lost a blue HP laptop bag near the library. Has my charger and notes inside. Very important!");
        i1.setType(Item.ItemType.LOST);
        i1.setCategory("Electronics");
        i1.setLocation("Main Library, Block A");
        i1.setDateOccurred("2024-12-10");
        i1.setContactInfo("arjun.sharma@srmap.edu.in / 9876543210");
        i1.setReportedBy(u1);
        itemRepository.save(i1);

        Item i2 = new Item();
        i2.setTitle("Water Bottle (Red Milton)");
        i2.setDescription("Found a red Milton water bottle near the basketball court. Name tag says 'Rahul'.");
        i2.setType(Item.ItemType.FOUND);
        i2.setCategory("Personal Items");
        i2.setLocation("Sports Complex, Basketball Court");
        i2.setDateOccurred("2024-12-11");
        i2.setContactInfo("priya@srmap.edu.in");
        i2.setReportedBy(u2);
        itemRepository.save(i2);

        Item i3 = new Item();
        i3.setTitle("Student ID Card");
        i3.setDescription("Found a student ID card belonging to Sneha Patel (AP21110010234) near the canteen.");
        i3.setType(Item.ItemType.FOUND);
        i3.setCategory("Documents");
        i3.setLocation("University Canteen");
        i3.setDateOccurred("2024-12-12");
        i3.setContactInfo("sudhamai@srmap.edu.in");
        i3.setReportedBy(u3);
        itemRepository.save(i3);

        Item i4 = new Item();
        i4.setTitle("Black OnePlus Earbuds");
        i4.setDescription("Lost OnePlus Nord Buds 2 (black) somewhere between CSE block and the hostel.");
        i4.setType(Item.ItemType.LOST);
        i4.setCategory("Electronics");
        i4.setLocation("CSE Block / Hostel Route");
        i4.setDateOccurred("2024-12-13");
        i4.setContactInfo("swathi@srmap.edu.in");
        i4.setReportedBy(u4);
        itemRepository.save(i4);

        Item i5 = new Item();
        i5.setTitle("Prescription Glasses");
        i5.setDescription(
                "Lost my spectacles (rectangular frame, -2.5 power) in the seminar hall during the guest lecture.");
        i5.setType(Item.ItemType.LOST);
        i5.setCategory("Personal Items");
        i5.setLocation("Seminar Hall, Block B");
        i5.setDateOccurred("2024-12-14");
        i5.setContactInfo("nagur@srmap.edu.in / 9876543210");
        i5.setReportedBy(u5);
        itemRepository.save(i5);

        Item i6 = new Item();
        i6.setTitle("Purple Umbrella");
        i6.setDescription("Found a purple umbrella left at the bus stop near the main gate.");
        i6.setType(Item.ItemType.FOUND);
        i6.setCategory("Accessories");
        i6.setLocation("Main Gate Bus Stop");
        i6.setDateOccurred("2024-12-14");
        i6.setContactInfo("madhavi@srmap.edu.in");
        i6.setReportedBy(u6);
        itemRepository.save(i6);

    }
}
