import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 320,
    marginBottom: 12,
    maxWidth: 480,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  mainTitle: {
    color: "#f87ede",
  }
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.mainTitle} variant="h5" component="h2">
          子どもの成長をシェアしよう
        </Typography>
        <Typography variant="body1" component="p">
          ・日々の成長をシェアできます。
        </Typography>
        <Typography variant="body1" component="p">
          ・子どもたちの支援に有効だったことをシェアできます。
        </Typography>
        <Typography variant="body1" component="p">
          ・目から鱗だった知識や学習をシェアしましょう。
        </Typography>
      </CardContent>
    </Card>
  );
}

