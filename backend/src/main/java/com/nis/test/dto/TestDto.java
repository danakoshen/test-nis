package com.nis.test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class TestDto {
    private Long id;
    private String title;
    private String description;
    private List<QuestionDto> questions;
}