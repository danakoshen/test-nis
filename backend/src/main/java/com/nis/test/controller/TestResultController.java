package com.nis.test.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nis.test.domain.Question;
import com.nis.test.domain.Test;
import com.nis.test.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class TestResultController {
    @Autowired
    private TestService testService;

    private static final Logger logger = LoggerFactory.getLogger(TestResultController.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/{id}/check")
    public Map<String, Object> checkAnswers(@PathVariable Long id, @RequestBody Map<Long, Object> userAnswers) {
        Test test = testService.getTestById(id);
        int correctAnswers = 0;
        List<Map<String, Object>> results = new ArrayList<>();

        for (Question question : test.getQuestions()) {

            Object userAnswer = userAnswers.get(question.getId());
            Object correctAnswer = question.getAnswer();
            boolean isCorrect = isAnswerCorrect(question.getType(), userAnswer, correctAnswer);
            logger.info("Question ID: {}, User Answer: {}, Correct Answer: {}", question.getId(), userAnswer,
                    correctAnswer);
            if (isCorrect) {
                correctAnswers++;
            }

            Map<String, Object> result = new HashMap<>();
            result.put("questionId", question.getId());
            result.put("question", question.getQuestion());
            result.put("userAnswer", userAnswer);
            result.put("correctAnswer", correctAnswer);
            result.put("isCorrect", isCorrect);

            results.add(result);
        }

        double percentage = (double) correctAnswers / test.getQuestions().size() * 100;

        return Map.of(
                "correctAnswers", correctAnswers,
                "percentage", percentage,
                "details", results);
    }

    private boolean isAnswerCorrect(String type, Object userAnswer, Object correctAnswer) {
        if (userAnswer == null || correctAnswer == null)
            return false;

        JsonNode userJson = objectMapper.valueToTree(userAnswer);
        JsonNode correctJson = (JsonNode) correctAnswer; // Правильный ответ уже JsonNode

        switch (type) {
            case "single":
            case "drag-and-drop":
            case "sorting":
                return userJson.equals(correctJson); // JSON-проверка

            case "multiple":
                return objectMapper.convertValue(userJson, Set.class)
                        .equals(objectMapper.convertValue(correctJson, Set.class));

            default:
                return false;
        }
    }
}
