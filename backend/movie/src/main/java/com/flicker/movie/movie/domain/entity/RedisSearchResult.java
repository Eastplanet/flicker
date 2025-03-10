package com.flicker.movie.movie.domain.entity;


import org.springframework.data.annotation.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;


@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash("SearchResult")
public class RedisSearchResult {

    @Id
    private String keyword; // 레디스 key 값

    private String mongoKey; // MongoDB의 _id 값

    @TimeToLive
    private Long expiration; // TTL 값을 동적으로 설정
}
