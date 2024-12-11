const getTimeAgo = (date)=>{
  const now = new Date();
  const diff = now - new Date(date);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds/60);
  const hours = Math.floor(minutes/60);
  const days = Math.floor(hours/24);
  const months = Math.floor(days/30);
  const years = Math.floor(months/12);

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (minutes < 60) {
    return `${minutes}min`;
  } else if (hours < 24) {
    return `${hours}hr`;
  } else if (days < 30) {
    return `${days}d`;
  } else if (months < 12) {
    return `${months}mo`;
  } else {
    return `${years}y`;
  }
}
module.exports = getTimeAgo;