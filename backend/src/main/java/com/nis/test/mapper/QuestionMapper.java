package com.nis.test.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nis.test.dto.QuestionDto;
import com.nis.test.domain.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestionMapper {

    private final ObjectMapper objectMapper;

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