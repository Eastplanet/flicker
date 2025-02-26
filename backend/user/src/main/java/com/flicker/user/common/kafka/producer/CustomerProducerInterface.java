package com.flicker.user.common.kafka.producer;

import com.flicker.user.common.kafka.dto.MovieInfo;
import com.flicker.user.common.kafka.dto.SentimentReview;
import com.flicker.user.common.kafka.dto.WordCloudReview;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;

public interface CustomerProducerInterface {
    public void sendSentimentLog(SentimentReview msg);
    public void sendWordCloudLog(WordCloudReview msg);
    public void sendMovieInfo(MovieInfo movieInfo);
    public void close();
}
