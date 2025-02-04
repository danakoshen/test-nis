package com.nis.test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nis.test.domain.Question;
import com.nis.test.domain.Test;
import com.nis.test.repository.TestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TestRepository testRepository;
    private final ObjectMapper objectMapper;

    public DataInitializer(TestRepository testRepository, ObjectMapper objectMapper) {
        this.testRepository = testRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        Test test = new Test();
        test.setTitle("Пример теста");
        test.setDescription("Этот тест содержит примеры вопросов разных типов.");

        Question q1 = new Question();
        q1.setType("single");
        q1.setQuestion("Какого цвета небо?");
        q1.setOptions(objectMapper.valueToTree(Arrays.asList("Синий", "Зеленый", "Красный")));
        q1.setAnswer(objectMapper.valueToTree("Синий"));

        Question q2 = new Question();
        q2.setType("drag-and-drop");
        q2.setQuestion("Разместите страны в их столицах");
        Map<String, String> options2 = new HashMap<>();
        options2.put("Казахстан", "Астана");
        options2.put("Франция", "Париж");
        options2.put("Япония", "Токио");
        q2.setOptions(objectMapper.valueToTree(options2));
        q2.setAnswer(objectMapper.valueToTree(options2));

        Question q3 = new Question();
        q3.setType("sorting");
        q3.setQuestion("Упорядочьте числа по возрастанию");
        q3.setOptions(objectMapper.valueToTree(Arrays.asList(3, 1, 2)));
        q3.setAnswer(objectMapper.valueToTree(Arrays.asList(1, 2, 3)));

        Question q4 = new Question();
        q4.setType("multiple");
        q4.setQuestion("Какие из этих чисел четные?");
        q4.setOptions(objectMapper.valueToTree(Arrays.asList('1', '2', '3', '4')));
        q4.setAnswer(objectMapper.valueToTree(Arrays.asList('2', '4')));

        test.setQuestions(Arrays.asList(q1, q2, q3, q4));
        testRepository.save(test);
    }
}