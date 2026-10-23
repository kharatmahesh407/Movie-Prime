import { useEffect, useState } from "react";
import { getMovieVideos } from "../services/tmdb";

function TrailerModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrailer() {
      try {
        setLoading(true);

        const data = await getMovieVideos(movie.id);

        const videos = data?.results || [];

        // First preference: Official YouTube Trailer
        let trailer = videos.find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official === true
        );

        // Second preference: Any YouTube Trailer
        if (!trailer) {
          trailer = videos.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer"
          );
        }

        // Third preference: YouTube Teaser
        if (!trailer) {
          trailer = videos.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Teaser"
          );
        }

        setTrailerKey(trailer?.key || null);
      } catch (error) {
        console.error(
          "TMDB Trailer Error:",
          error
        );

        setTrailerKey(null);
      } finally {
        setLoading(false);
      }
    }

    if (movie?.id) {
      loadTrailer();
    }
  }, [movie?.id]);

  // Close with Escape key
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  return (
    <div
      className="trailer-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="trailer-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="trailer-modal-header">

          <h2>
            🎬 {movie.title}
          </h2>

          <button
            type="button"
            className="trailer-close"
            onClick={onClose}
            aria-label="Close trailer"
          >
            ✕
          </button>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="trailer-message">
            <span>
              Loading trailer... 🎬
            </span>
          </div>
        )}


        {/* TRAILER */}

        {!loading && trailerKey && (
          <div className="trailer-video">

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title={`${movie.title} Trailer`}
              allow="
                autoplay;
                encrypted-media;
                picture-in-picture
              "
              allowFullScreen
            />

          </div>
        )}


        {/* NO TRAILER */}

        {!loading && !trailerKey && (
          <div className="trailer-message">

            <div className="trailer-no-video">
              🎬
            </div>

            <h3>
              Trailer Not Available
            </h3>

            <p>
              Sorry, trailer for this movie
              is not available on TMDB.
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default TrailerModal;