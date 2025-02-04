package com.nis.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuestionDto {
    private Long id;
    private String type;
    private String question;
    private Object options;
    private Object answer;
}