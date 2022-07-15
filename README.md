# 오늘도 레벨업 (levelup-everyday)


하루하루 성장을 기록하기 위한 도구 , 성장점수를 한눈에 그래프로 표현

<img width="187" alt="Screen Shot 2022-07-10 at 9 01 18 PM" src="https://user-images.githubusercontent.com/78840341/179131467-6e3580ac-8a11-455f-bc80-8065bf670a0d.png">


# 개발환경 


**Frontend :** <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

**Backend :**  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white">

**DB :**  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">


**Deploy :**  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">



# 시연 영상 

[<img src="https://img.shields.io/badge/Youtube-FF0000?style=for-the-badge&logo=Youtube&logoColor=white">](https://www.youtube.com/watch?v=kz9085HV_VM)

# 핵심 기능 

## 랜딩 페이지 - Sign In  

### Context API를 이용해서 로그인 정보에 따른 전역 상태관리 
- 로그인을 하게 되면 `localstorage`에 토큰을 저장 
- `auth-context`에서 token 이 존재여부에 따라 `isLoggedIn`  상태 값 변경 
- 컴포넌트에서 auth-context를 이용(`const authCtx = useContext(AuthContext);`)하여 해당 자료를 이용 

### User Login 정보에 따른 Conditional Rendering

![로그인nav](https://user-images.githubusercontent.com/78840341/179143751-a9c36c87-3cd4-45e0-b21f-a1992b41dbfa.gif)

`isLoggedIn`  의 상태값에 따라서 navbar, login 버튼등을 변경 

### passport와 useGuard를 이용한 로그인

api 요청 -> Guard -> jwt Strategy -> secretKey 




custom decorator를 이용해서 현재 유저정보 확인  
```typescript

  //user.controller.ts
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user: User) {
    return user.readOnlyData;
  }
  
  //user.decorator.ts  
  export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);


```

jwt gurad를 설정 

```typescript

//jwt.guard.ts
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


```

gurad에 사용될 strategy 설정 

```typescript

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const user = await this.usersRepository.findUserByIdWithoutPassword(
      payload.sub,
    );
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('접근오류');
    }
  }
}

```




## Sign Up


### useState로  입력된 값에 따른 정규식 검사 
유저가 입력한 값을 `state`에 입력하여서 해당하는 state값이 정규식과 일치한다면 경고문구의 색을 초록색으로 변경 

```javascript


const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

              {regex.test(password) === true && (
                <Text correct={true}>
                  영문,숫자, 특수문자 각 한개이상 포함하여 8자 이상
                </Text>
              )}
              {regex.test(password) === false && (
                <Text correct={false}>
                  영문,숫자, 특수문자 각 한개이상 포함하여 8자 이상
                </Text>
              )}
```

### bcrypt를 이용한 비밀번호 해싱 

salt를 추가하여 bcrypt 비밀번호 해싱 

```typescript 
  async signUp(body: UsersCreateDto) {
    const { email, name, password } = body;
    //duplicated email
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일이 이미 존재합니다.');
    }
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
    });

    return user.readOnlyData;
  }

```






## Goal Create Page

### styled Component 로 결과값 dynamic rendering
```javascript
  const goalList = goalCtx.goals.map((goal) => {
    const categoryName = getName(categoryList, goal.category);
    const black = ["어학", "습관 가지기", "취미생활"];
    const color = black.includes(categoryName) ? "#000000e8" : "#fff";

    const styleEditBtn = { color: color, fontSize: "1.3em", margin: "5px" };

    const styleDeleteBtn = {
      color: "#f84f31",
      fontSize: "1.3em",
      margin: "5px",
    };

```

### False Delete 

각 목표를 삭제하게 되면 점수마저 사라지게 되기 때문에 해당삭제 기능을 기록을 지우는 것이 아닌 `falseDelete`필드를 업데이트하는 방식으로 진행 

```typescript
  
  // goals.serveice.ts
  async deleteGoal(user: User, id: string) {
    return this.goalsRepository.deleteGoal(user, id);
  }
  
    //goals.repository.ts
    async deleteGoal(user: User, id: string | Types.ObjectId) {
    const goal = await this.goalsModel.findById({ _id: id });
    if (user.role === 0) {
      if (goal.author !== user._id.toString()) {
        throw new UnauthorizedException('삭제 권한이 없습니다.');
      }
    }
    goal.softDelete = true;
    return await goal.save();
  }
```


##  Goal Page


### Goal Context로 Goal List 표현

`goalList`를 필요로 하는 `component`가 `goal`, `goalCreate`, `graph`가 있어 한 번 `axios`로 상태값을 `전역`으로 관리하면 좋을 것 같아 `context`를 이용하였다. 



```javascript
const GoalContext = React.createContext({
  goals: [],
  reset: () => {},
});

export const GoalContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getAllGoals();

    return () => {};
  }, []);

  const getAllGoals = async () => {
    // event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    await axios
      .get("/goals", config)
      .then((response) => {
        if (response.data.success) {
          setGoals(response.data.data);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(`${statusCode} ${err.message}`);
      });
  };

  const resetGoal = () => {
    setGoals([]);
  };

  const contextvalue = {
    goals,
    reset: resetGoal,
  };
  
  
  //goal index.js
  
  
    const goalList = goalCtx.goals.map((goal) => {
    return (
      <GoalWrapper key={goal._id}>
        <GoalList>{goal.contents}</GoalList>
        <Checkbox
          type="checkbox"
          id={goal._id}
          value={goal._id}
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, goal._id);
          }}
          checked={checkedItem.includes(goal._id) ? true : false}
        />
      </GoalWrapper>
    );
  });

```



### Create Score Scheduled 

![score_logic drawio](https://user-images.githubusercontent.com/78840341/179141965-4bf3a0f9-c0aa-4144-bed4-88679a3860cf.png)


유저가 만일 3개의 목표 중에 하나만 제출을 하다면 score는 1개만 만들어진다. 이렇게 되면 그래프를 그랠 때 자료가 비어버려서(0인자료 표현 불가능) 문제가 발생했다. 그래서 12시가 되면은 자동으로 유저가 
제출하지 않은 목표에 대해서는 `점수가 0인  score자료를 만드는 scheduling코드를 작성`했다. 추가로 해당 스케쥴이 돌면 이전날 유저가 하나의 목표도 제출하지 않았다면 유저의 
`continuity를 0으로 리셋`하고 제출을 하였다면 `contituity를 추가`하는 방식으로 작성했다. 



```typescript

  async createScoreScheduled() {
    const dateBefore = moment().subtract(1, 'day').format('YYYY-MM-DD');
    const dateSeoul = moment().format('YYYY-MM-DD');

    const data = {
      startDate: dateBefore,
      endDate: dateSeoul,
    };

    const getScoreBefore = await this.scoreRepository.getScoreBetweenDate(data);

    //* 유저 연속성 업데이트
    let userSubmitted = getScoreBefore.map((score) => {
      return score['author'].toString(); //mongoose typeId -> new로 새로 정의됌 - 고유한 값으로 인식
    });
    userSubmitted = [...new Set(userSubmitted)];

    const users = await this.usersRepository.getAllUserId();
    for (const user of users) {
      if (userSubmitted.includes(user['_id'].toString())) {
        await this.usersRepository.findUserAndUpdateContinuity(
          user['id'].toString(),
          true,
        );
      } else {
        await this.usersRepository.findUserAndUpdateContinuity(
          user['id'].toString(),
          false,
        );
      }
    }

    //* 빈 점수 생성
    const goalSubmitted = getScoreBefore.map((score) => {
      return score['goal'].toString();
    });
    const goals = await this.goalsRepository.getExcludedGoals(goalSubmitted);
    console.log(goalSubmitted);
    console.log(goals);

    for (const goal of goals) {
      const insertData = {
        score: 0,
        author: new mongoose.Types.ObjectId(goal['author']),
        goal: new mongoose.Types.ObjectId(goal['_id']),
        updatedAt: moment().subtract(1, 'day').format(),
        createdAt: moment().subtract(1, 'day').format(),
      };
      try {
        await this.scoreRepository.InsertData(insertData);
      } catch (err) {
        console.log(err);
      }
    }

    return 1;
  }


```



##  Graph Page 
자료를 chartJS로 그리기 위해 요구데이터 형태에 맞춰 표현 


### 누적 점수 그래프

전체 점수자료를 바탕으로 (1) `labels`를 표현하기 위해 `date` state에 누적, 데이터를 표현하기 위해 `scoreAcuum`에 누적
만들어진 state값으로 (2) accumLineConfig 함수로 차트에 필요한 설정 추가 

```javascript 

//(1)
const calcScore = (score) => {
    let scoreAccumArray = [];
    let dateArray = [];
    let sum = 0;
    for (const element of score) {
      sum += element.score;
      scoreAccumArray.push(sum);
      dateArray.push(element.createdAt.slice(0, 10));
    }

    const newScore = [];
    const newDate = [];

    dateArray.forEach((value, index) => {
      if (index % goalCtx.goals.length === 2) {
        newScore.push(scoreAccumArray[index]);
        newDate.push(value);
      }
    });

    setScoreAccum(newScore);
    setDates(newDate);
    setScoreTotal(sum);
  };
  
  
  //(2)
  
    const accumChartConfig = (label, data) => {
    const color = "#8080ff";

    const dateFormat = label.map((date) => {
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const result = `${month}-${day}`;
      return result;
    });

    let obj = {};
    obj["label"] = "누적점수";
    obj["data"] = data;
    obj["backgroundColor"] = [color];
    obj["borderColor"] = [color];

    const result = { labels: dateFormat, datasets: [obj] };

    setAccumData(result);
  };
  
```



### 각 목표별 그래프 표현 

백엔드에서 주어진 자료를 바탕으로 frontend에서 구성할시 그룹합 과정에서 `성능이슈`가 발견되어서 백엔드의 `별도의 api`를 만들어서 진행 
받은 자료를 바탕으로 차트 설정값을 추가하는 `lineChartConfig` 함수 실행 


```typescript

  //groupBy.ts
  
  export const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
};



  //get graph API 
  
  async getGraphScore(user: User) {
    const userId = user._id;
    const dataEnd = {
      startDate: moment('2022-01-01').startOf('day').format(),
      endDate: moment().subtract(1, 'day').endOf('day').format(),
    };
    const scores = await this.scoreRepository.getScoreEndDate(userId, dataEnd);

    const makeGraphData = async (scoreData) => {
      const goals = await this.goalsRepository.getAllGoals(userId);

      const goalObj = {};
      for (const goal of goals) {
        goalObj[goal._id] = goal.contents;
      }
      const data = scoreData.map((data) => {
        const obj = {
          date: data.updatedAt.slice(0, 10),
          goal: goalObj[data.goal],
          score: data.score,
        };
        return obj;
      });
      const groupedData = groupBy(data, 'date');

      const result = [];

      let id = 0;

      for (const key in groupedData) {
        const value = groupedData[key];
        const obj = {};
        obj['id'] = id;
        id += 1;
        obj['date'] = key;
        let accum = 0;
        for (const e of value) {
          obj[e.goal] = e.score;
          accum += e.score;
        }
        obj['total'] = accum;
        result.push(obj);
      }

      const labels = result.map((data) => data.date);

      const dataSet = goals.map((goal) => {
        const obj = {};
        const title = goal.contents;

        obj['label'] = title;
        obj['data'] = result.map((score) => score[title]);
        return obj;
      });
      const dataSets = {
        labels,
        datasets: dataSet,
      };

      return dataSets;
    };

    const data = makeGraphData(scores);

    return data;
  }


```


```javascript
  const lineChartConfig = (data) => {
    const color = ["#ffeba8", "#FFFB8C", "#bae9f7", "#b2d2f7", "#a3baf0"];
    const dataSet = data.datasets;

    for (let e of dataSet) {
      let obj = {
        ...e,
      };
      obj["backgroundColor"] = [color[dataSet.indexOf(e)]];
      obj["borderColor"] = [color[dataSet.indexOf(e)]];
      obj["lineTension"] = 0.5;
      dataSet[dataSet.indexOf(e)] = obj;
    }

    const dateFormat = data.labels.map((date) => {
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const result = `${month}-${day}`;
      return result;
    });

    let result = { labels: dateFormat, datasets: dataSet };

    setLineData(result);
  };

```







# Backend API 

[<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white">](http://ec2-3-39-255-32.ap-northeast-2.compute.amazonaws.com:5000/docs/#/ )

**SWAGGER_USER :**`levelup_admin`

**SWAGGER_PASSWORD :** `skygoup!@`




