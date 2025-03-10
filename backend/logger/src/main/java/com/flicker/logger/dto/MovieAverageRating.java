package com.flicker.logger.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MovieAverageRating {
    private Integer movieSeq;
    private Integer reviewSeq;
    private Integer movieCount;
    private Double movieTotalRating;

    public MovieAverageRating(Integer movieSeq, Integer movieCount, Double movieTotalRating) {
        this.movieSeq = movieSeq;
        this.movieCount = movieCount;
        this.movieTotalRating = movieTotalRating;
    }

    // 평균 평점 계산
    public Double getAverageRating() {
        if (movieCount == 0) return 0.0;
        return Math.round((movieTotalRating / movieCount) * 10.0) / 10.0;
    }
}