package com.flicker.user.common.kafka.producer;

import com.flicker.user.common.kafka.dto.MovieInfo;
import com.flicker.user.common.kafka.dto.SentimentReview;
import com.flicker.user.common.kafka.dto.WordCloudReview;
import org.springframework.stereotype.Service;

@Service
public class CustomerProducerMock implements CustomerProducerInterface{

    @Override
    public void sendSentimentLog(SentimentReview msg) {

    }

    @Override
    public void sendWordCloudLog(WordCloudReview msg) {

    }

    @Override
    public void sendMovieInfo(MovieInfo movieInfo) {

    }

    @Override
    public void close() {

    }
}
