import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSelection({ user, onProfileSelect }) {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [showAddProfile, setShowAddProfile] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [isKidsProfile, setIsKidsProfile] = useState(false);

  const [error, setError] = useState("");


  // =========================================
  // PROFILE STORAGE KEY
  // =========================================

  const getProfileStorageKey = () => {

    const email =
      user?.email ||
      user?.phone ||
      "default-user";

    return `movieProfiles_${email}`;
  };


  // =========================================
  // DEFAULT PROFILES
  // =========================================

  function getDefaultProfiles() {

    return [
      {
        id: Date.now(),
        name: user?.name || "User",
        avatar: "👤",
        kids: false,
      },
      {
        id: Date.now() + 1,
        name: "Kids",
        avatar: "🧒",
        kids: true,
      },
    ];
  }


  // =========================================
  // LOAD PROFILES
  // =========================================

  useEffect(() => {

    if (!user) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    const storageKey =
      getProfileStorageKey();

    const savedProfiles =
      localStorage.getItem(
        storageKey
      );


    if (savedProfiles) {

      try {

        const parsedProfiles =
          JSON.parse(savedProfiles);

        if (
          Array.isArray(parsedProfiles) &&
          parsedProfiles.length > 0
        ) {

          setProfiles(
            parsedProfiles
          );

          return;
        }

      } catch {

        // Ignore invalid data
      }
    }


    // Create default profiles
    const defaultProfiles =
      getDefaultProfiles();

    setProfiles(
      defaultProfiles
    );

    localStorage.setItem(
      storageKey,
      JSON.stringify(
        defaultProfiles
      )
    );

  }, [user]);


  // =========================================
  // SAVE PROFILES
  // =========================================

  function saveProfiles(updatedProfiles) {

    setProfiles(
      updatedProfiles
    );

    localStorage.setItem(
      getProfileStorageKey(),
      JSON.stringify(
        updatedProfiles
      )
    );
  }


  // =========================================
  // SELECT PROFILE
  // =========================================

  function handleSelectProfile(profile) {

    onProfileSelect(profile);

    navigate("/", {
      replace: true,
    });
  }


  // =========================================
  // ADD PROFILE
  // =========================================

  function handleAddProfile(e) {

    e.preventDefault();

    setError("");

    const cleanName =
      profileName.trim();


    if (!cleanName) {

      setError(
        "Please enter a profile name."
      );

      return;
    }


    // Check duplicate name
    const alreadyExists =
      profiles.some(
        (profile) =>
          profile.name
            .toLowerCase() ===
          cleanName.toLowerCase()
      );


    if (alreadyExists) {

      setError(
        "A profile with this name already exists."
      );

      return;
    }


    const newProfile = {

      id:
        Date.now(),

      name:
        cleanName,

      avatar:
        isKidsProfile
          ? "🧒"
          : "👤",

      kids:
        isKidsProfile,

    };


    const updatedProfiles = [
      ...profiles,
      newProfile,
    ];


    saveProfiles(
      updatedProfiles
    );


    // Reset form
    setProfileName("");

    setIsKidsProfile(
      false
    );

    setError("");

    setShowAddProfile(
      false
    );
  }


  // =========================================
  // DELETE PROFILE
  // =========================================

  function handleDeleteProfile(
    profileId
  ) {

    if (profiles.length <= 1) {

      setError(
        "You must keep at least one profile."
      );

      return;
    }


    const updatedProfiles =
      profiles.filter(
        (profile) =>
          profile.id !== profileId
      );


    saveProfiles(
      updatedProfiles
    );

    setError("");
  }


  // =========================================
  // CANCEL ADD PROFILE
  // =========================================

  function handleCancelAdd() {

    setShowAddProfile(
      false
    );

    setProfileName("");

    setIsKidsProfile(
      false
    );

    setError("");
  }


  // =========================================
  // UI
  // =========================================

  return (

    <main className="profile-selection-page">

      <div className="profile-selection-container">


        {/* =========================================
            TITLE
        ========================================= */}

        <div className="profile-header">

          <h1>
            Who's watching?
          </h1>

          <p>
            Choose a profile to continue
          </p>

        </div>


        {/* =========================================
            ERROR
        ========================================= */}

        {error && (
          <p className="profile-error">
            {error}
          </p>
        )}


        {/* =========================================
            PROFILES
        ========================================= */}

        {!showAddProfile && (

          <div className="profiles-grid">

            {profiles.map(
              (profile) => (

                <div
                  key={profile.id}
                  className="profile-item"
                >

                  {/* PROFILE BUTTON */}

                  <button
                    type="button"
                    className="profile-card"
                    onClick={() =>
                      handleSelectProfile(
                        profile
                      )
                    }
                  >

                    <div
                      className={
                        profile.kids
                          ? "profile-avatar kids-avatar"
                          : "profile-avatar"
                      }
                    >
                      {profile.avatar}
                    </div>

                    <span className="profile-name">
                      {profile.name}
                    </span>

                    {profile.kids && (
                      <span className="kids-label">
                        KIDS
                      </span>
                    )}

                  </button>


                  {/* DELETE */}

                  {profiles.length > 1 && (

                    <button
                      type="button"
                      className="delete-profile-button"
                      onClick={() =>
                        handleDeleteProfile(
                          profile.id
                        )
                      }
                      aria-label={`Delete ${profile.name} profile`}
                    >
                      ✕
                    </button>

                  )}

                </div>

              )
            )}


            {/* =========================================
                ADD PROFILE
            ========================================= */}

            <button
              type="button"
              className="profile-card add-profile-card"
              onClick={() => {
                setShowAddProfile(
                  true
                );

                setError("");
              }}
            >

              <div className="add-profile-icon">
                +
              </div>

              <span className="profile-name">
                Add Profile
              </span>

            </button>

          </div>

        )}


        {/* =========================================
            ADD PROFILE FORM
        ========================================= */}

        {showAddProfile && (

          <form
            className="add-profile-form"
            onSubmit={
              handleAddProfile
            }
          >

            <div className="add-profile-icon large">
              👤
            </div>

            <h2>
              Add Profile
            </h2>

            <p>
              Create a new profile
            </p>


            {/* PROFILE NAME */}

            <div className="profile-form-group">

              <label htmlFor="profile-name">
                Profile Name
              </label>

              <input
                id="profile-name"
                type="text"
                placeholder="Enter profile name"
                value={profileName}
                maxLength={30}
                autoFocus
                onChange={(e) => {
                  setProfileName(
                    e.target.value
                  );

                  setError("");
                }}
              />

            </div>


            {/* KIDS CHECKBOX */}

            <label className="kids-checkbox">

              <input
                type="checkbox"
                checked={isKidsProfile}
                onChange={(e) =>
                  setIsKidsProfile(
                    e.target.checked
                  )
                }
              />

              <span>
                This is a Kids profile
              </span>

            </label>


            {/* BUTTONS */}

            <div className="profile-form-buttons">

              <button
                type="button"
                className="profile-cancel-button"
                onClick={
                  handleCancelAdd
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-button"
              >
                Create Profile
              </button>

            </div>

          </form>

        )}


        {/* =========================================
            MANAGE PROFILES
        ========================================= */}

        {!showAddProfile && (

          <button
            type="button"
            className="manage-profiles-button"
            onClick={() => {
              setShowAddProfile(
                true
              );
            }}
          >
            + Add another profile
          </button>

        )}
         
                 
        

      </div>

    </main>
  );
}

export default ProfileSelection;