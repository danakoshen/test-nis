package com.nis.test.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TestDetailDto {
    public String title;
    public String description;
    public List<QuestionDto> questions;
}
