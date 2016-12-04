package com.jy.service.impl;

import com.jy.dao.UserBookLikeDao;
import com.jy.dao.UserProfileDao;
import com.jy.entity.UserBookLike;
import com.jy.entity.UserProfile;
import com.jy.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(rollbackFor = Exception.class)
@Service
public class UserProfileServiceImpl extends BaseServiceImpl<UserProfile> implements UserProfileService {

    @Autowired
    private UserProfileDao userProfileDao;
    @Autowired
    private UserBookLikeDao userBookLikeDao;

    @Override
    public UserProfile findByUsername(String username) {
        return userProfileDao.selectByUsername(username);
    }

    @Override
    public UserProfile findByOwnerId(Long ownerId) {
        return userProfileDao.selectByOwnerId(ownerId);
    }

    @Override
    public void saveUserBookLike(long ownerId, long bookId) {
        UserBookLike userBookLike = userBookLikeDao.selectUserBookLikeByOwnerIdAndBookId(ownerId, bookId);
        if (userBookLike == null) {
            userBookLikeDao.insertUserBookLike(ownerId, bookId);
        }
    }

    @Override
    public UserBookLike findUserBookLikeByOwnerIdAndBookId(Long ownerId, Long bookId) {
        return userBookLikeDao.selectUserBookLikeByOwnerIdAndBookId(ownerId, bookId);
    }

    @Override
    public void removeUserBookLikeByOwnerIdAndBookId(Long ownerId, Long bookId) {
        userBookLikeDao.deleteUserBookLikeByOwnerIdAndBookId(ownerId, bookId);
    }

    @Override
    public void removeUserBookLikeByOwnerId(Long ownerId) {
        userBookLikeDao.deleteUserBookLikeByOwnerId(ownerId);
    }

    @Override
    public List<UserBookLike> findUserBookLikeByOwnerId(Long ownerId) {
        return userBookLikeDao.selectByOwnerId(ownerId);
    }
}
