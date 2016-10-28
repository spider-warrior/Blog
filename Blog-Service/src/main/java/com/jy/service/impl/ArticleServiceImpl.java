package com.jy.service.impl;

import com.jy.entity.Article;
import com.jy.service.ArticleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(rollbackFor = Exception.class)
@Service
public class ArticleServiceImpl extends BaseServiceImpl<Article> implements ArticleService{
}