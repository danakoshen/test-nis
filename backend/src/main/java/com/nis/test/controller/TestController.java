package com.nis.test.controller;

import com.nis.test.dto.TestDetailDto;
import com.nis.test.mapper.TestMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.nis.test.service.TestService;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;
    private final TestMapper testMapper;

    @GetMapping
    public ResponseEntity<?> getAllTests() {
        return ResponseEntity.ok(testMapper.toDtoList(testService.getAllTests()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> createTest(@RequestBody TestDetailDto test) {
        testService.createTest(test);
        return ResponseEntity.ok("Тест создан");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateTest(@PathVariable Long id, @RequestBody TestDetailDto testDetails) {
        testService.updateTest(id, testDetails);
        return ResponseEntity.ok("Тест обновлен");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteTest(@PathVariable Long id) {
        testService.deleteTest(id);
    }
}
