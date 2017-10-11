package com.jy.blog.response.service;

import com.jy.blog.blog.common.util.TimeUtil;
import com.jy.blog.entity.Mood;
import com.jy.blog.response.entity.MoodWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MoodWrapperService extends ResponseBaseService {

    private static final MoodWrapper empty = new MoodWrapper();
    @Autowired
    private UserWrapperService userWrapperService;

    public MoodWrapper buildMoodWrapper(Mood mood) {
        if (mood == null) {
            return empty;
        }
        MoodWrapper moodWrapper = new MoodWrapper();
        moodWrapper.setCoverImage(mood.getCoverImage());
        moodWrapper.setContent(mood.getContent());
        moodWrapper.setCreateTime(TimeUtil.formatYYYYMMMDD(mood.getCreateTime()));
        moodWrapper.setOwner(userWrapperService.buildUserWrapper(mood.getOwner(), false));
        return moodWrapper;
    }
}