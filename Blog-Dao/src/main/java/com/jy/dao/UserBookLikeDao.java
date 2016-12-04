package com.jy.dao;

import com.jy.entity.UserBookLike;

import java.util.List;

public interface UserBookLikeDao {

    void insertUserBookLike(Long ownerId, Long bookId);

    UserBookLike selectUserBookLikeByOwnerIdAndBookId(Long ownerId, Long bookId);

    void deleteUserBookLikeByOwnerIdAndBookId(Long ownerId, Long bookId);

    void deleteUserBookLikeByOwnerId(Long ownerId);

    List<UserBookLike> selectByOwnerId(Long ownerId);

}
