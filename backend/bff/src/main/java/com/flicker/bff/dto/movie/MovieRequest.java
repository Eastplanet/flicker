package com.flicker.bff.dto.movie;

public interface MovieRequest {
    String getMovieTitle();
    String getDirector();
    String getGenre();
    String getCountry();
    String getMoviePlot();
    String getAudienceRating();
    int getMovieYear();
    String getRunningTime();
    String getMoviePosterUrl();
    String getTrailerUrl();
    String getBackgroundUrl();
}