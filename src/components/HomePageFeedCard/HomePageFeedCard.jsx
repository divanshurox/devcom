import React from "react";
import "./HomePageFeedCard.scss";
import { useUser, firestore } from "util/db";

import commentIcon from "../../assets/message-square.svg";
import Link from "next/link";

const dateFormateOptions = { month: "long", day: "numeric", year: "numeric" };
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", dateFormateOptions).format(date);
}

const UserDetailChip = ({ userId, createdTime }) => {
  const query = useUser(userId);
  return (
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
          <img
            src={query.data && query.data.photoURL}
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="media-content">
        <p>{query.data && query.data.displayName}</p>
        <span>{formatDate(createdTime)}</span>
      </div>
    </div>
  );
};

const HomePageFeedCard = ({ data }) => {
  return (
    <div className="home-page-feed-card">
      <div className="heading">{data.type}</div>
      <h4 className="title is-4 card-title">{data.title}</h4>
      {data.desc && !!data.desc.length && (
        <p className="card-desc">{data.desc}</p>
      )}
      <div className="columns is-vcentered">
        <div className="column is-10">
          <UserDetailChip
            createdTime={data.created.seconds * 1000}
            userId={data.owner}
          />
        </div>
        <div className="column">
          <Link href={`/work/${data.id}`}>
            <button class="button">
              <img src={commentIcon} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageFeedCard;
