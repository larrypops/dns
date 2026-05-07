export type AboutPhoto = {
  id: string;
  url: string;
  alt: string;
};

export type AboutVideo = {
  id: string;
  url: string;
  poster?: string;
  title?: string;
};

export type AboutContent = {
  media: {
    photos: AboutPhoto[];
    videos: AboutVideo[];
  };
};
