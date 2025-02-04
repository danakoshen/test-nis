package com.nis.test.mapper;

import com.nis.test.dto.TestDetailDto;
import com.nis.test.dto.TestDto;

import lombok.RequiredArgsConstructor;

import com.nis.test.dto.QuestionDto;
import com.nis.test.domain.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nis.test.domain.Question;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TestMapper {
    private final ObjectMapper objectMapper;

    public Test toEntity(TestDetailDto dto) {
        Test test = new Test();
        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());

        List<Question> questions = dto.getQuestions().stream()
                .map(this::toEntity)
                .collect(Collectors.toList());

        questions.forEach(q -> q.setTest(test));
        test.setQuestions(questions);

        return test;
    }

    public TestDto toDto(Test test) {
        return new TestDto(
                test.getId(),
                test.getTitle(),
                test.getDescription(),
                test.getQuestions().stream()
                        .map(this::toDto)
                        .collect(Collectors.toList()));
    }

    public List<TestDto> toDtoList(List<Test> tests) {
        return tests.stream().map(this::toDto).collect(Collectors.toList());
    }

    public Question toEntity(QuestionDto dto) {
        Question question = new Question();
        question.setId(dto.getId());
        question.setType(dto.getType());
        question.setQuestion(dto.getQuestion());

        question.setOptions(objectMapper.valueToTree(dto.getOptions()));
        question.setAnswer(objectMapper.valueToTree(dto.getAnswer()));

        return question;
    }

    public QuestionDto toDto(Question question) {
        return new QuestionDto(
                question.getId(),
                question.getType(),
                question.getQuestion(),
                question.getOptions(),
                question.getAnswer());
    }
}