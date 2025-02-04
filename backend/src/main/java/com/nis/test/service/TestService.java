package com.nis.test.service;

import com.nis.test.domain.Test;
import com.nis.test.dto.TestDetailDto;
import com.nis.test.mapper.TestMapper;
import com.nis.test.repository.TestRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;
    private final TestMapper testMapper;

    public List<Test> getAllTests() {
        return testRepository.findAll();
    }

    public Test getTestById(Long id) {
        return testRepository.findById(id).orElseThrow(() -> new RuntimeException("Тест не найден"));
    }

    public Test createTest(TestDetailDto testDetailDto) {
        return testRepository.save(testMapper.toEntity(testDetailDto));
    }

    public Test updateTest(Long id, TestDetailDto testDetailDto) {
        Test test = testRepository.findById(id).orElseThrow(() -> new RuntimeException("Тест не найден"));
        Test newTest = testMapper.toEntity(testDetailDto);
        test.setTitle(newTest.getTitle());
        test.setDescription(newTest.getDescription());
        test.setQuestions(newTest.getQuestions());
        return testRepository.save(test);
    }

    public void deleteTest(Long id) {
        testRepository.deleteById(id);
    }
}