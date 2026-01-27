
export const COLORS = {
  cardBackground: "#323261",
  cardText: "#f8f8f2",
  borderDefault: "#595d78",
  borderCorrect: "#6bcf92",
  borderIncorrect: "#e06a6a",
};

export const SIZES = {
    width: { xs: "90%", sm: 800 },
    maxWidth: 1000,
    minHeight: 650,
    borderRadius: 8,


};

export const CARD_STYLES = {
  card: {
    width: { xs: "90%", sm: 800 },
    maxWidth: 1000,
    minHeight: 650,
    borderRadius: 8,
    boxShadow: 6,
    perspective: "1000px",
  },

  cardContent: {
    height: "100%",
    minHeight: 550,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
      }
    }
}

export const BOX_STYLES = {
  centerColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  
  cardSide: {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    gap: 3,
  },
  
  flipContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
  },

    content: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
    },
    
    actions: {
        display: "flex",
        justifyContent: "center",
        gap: 2,
    }

};