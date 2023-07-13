/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("meetings-test", {
    id: "id",
    uuid: { type: "varchar(100)", notNull: true },

    meeting_name: { type: "varchar(50)", notNull: true },

    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    callback_url: { type: "varchar(100) ", notNull: true },
    recording_status: { type: "boolean", notNull: true },
  });
};

exports.down = (pgm) => {};
