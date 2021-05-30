"use strict";

/***
 * 评论 controller层
 */

import dayjs from "@/utils/dayjs-util";
import { doFavor } from "@/api/comment";
import { authOperate } from "@/utils/util";

async function doFavorHandler(id, cid, liked, likedCount, emit) {
    authOperate(async () => {
        let updateFlag = false;
        liked = liked == false ? 1 : 0;
        try {
            await doFavor(id, cid, liked);
            updateFlag = true;
        } catch (e) {
            alert(e);
        } finally {
            if (updateFlag) {
                emit("updateComments", cid, {
                    liked: !!liked,
                    likedCount: likedCount + 1
                });
            }
        }
    });
}

/***
 * 更新评论信息
 * @param comments 评论列表
 * @param id 评论id
 * @oaram info 评论信息
 */
function updateComments(comments) {
    return function (commentId, info) {
        let updateIndex = comments.value.findIndex(d => d.commentId === commentId);
        if (updateIndex > -1) {
            comments.value[updateIndex] = Object.assign(
                comments.value[updateIndex],
                info
            );
        }
    };
}

function getDayjsStartTimeStamp(dayjs, unit = "day") {
    return dayjs.startOf(unit).valueOf();
}

function getDayjsEndTimeStamp(dayjs, unit = "day") {
    return dayjs.endOf(unit).valueOf();
}

/**
 * 格式化评论日期
 * @param timeStamp 时间戳
 */
function formatCommentDate(timeStamp) {
    const dateNow = new Date().getTime();
    const dayjsformat = dayjs();

    const todayStartTimeStamp = getDayjsStartTimeStamp(dayjsformat);
    const todayEndTimeStamp = getDayjsEndTimeStamp(dayjsformat);

    const yesterDayStartTimeStamp = getDayjsStartTimeStamp(
        dayjsformat.subtract(1, "day")
    );
    const yesterDayEndTimeStamp = getDayjsEndTimeStamp(
        dayjsformat.subtract(1, "day")
    );

    const thisYearStartTimeStamp = getDayjsStartTimeStamp(dayjsformat, "year");
    const thisYearEndTimeStamp = getDayjsEndTimeStamp(dayjsformat, "year");

    if (dateNow - timeStamp < 3600000) {
        return dayjs(timeStamp).fromNow();
    }
    if (timeStamp >= todayStartTimeStamp && timeStamp <= todayEndTimeStamp) {
        return dayjs(timeStamp).format("HH:mm");
    }
    if (
        timeStamp >= yesterDayStartTimeStamp &&
        timeStamp <= yesterDayEndTimeStamp
    ) {
        return dayjs(timeStamp).format("昨天HH:mm");
    }
    if (
        timeStamp >= thisYearStartTimeStamp &&
        timeStamp <= thisYearEndTimeStamp
    ) {
        return dayjs(timeStamp).format("MM月DD日");
    }

    return dayjs(timeStamp).format("YYYY年MM月DD日");
}

export default function useComment() {
    return {
        doFavorHandler,
        updateComments,
        formatCommentDate,
    };
}
